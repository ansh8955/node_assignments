const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

const url = "https://www.amazon.in/s?k=phone&page=2&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_2";

async function getData() {
    try {
        let response = await axios.get(url);
        fs.writeFileSync("amazon.txt", response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function processData() {
    // Fetch the data if not already present
    if (!fs.existsSync("amazon.txt")) {
        await getData();
    }

    try {
        let html = fs.readFileSync("amazon.txt", "utf-8");
        let $ = cheerio.load(html);

        let ProductsPrice = [];
        let ProductsRating = [];
        let ProductsName = [];

        $(".a-price-whole").each((index, element) => {
            ProductsPrice.push($(element).text().trim());
        });

        $(".a-size-medium.a-color-base.a-text-normal").each((index, element) => {
            ProductsName.push($(element).text().trim());
        });

        $(".a-icon.a-icon-star-small.aok-align-bottom .a-icon-alt").each((index, element) => {
            ProductsRating.push($(element).text().trim());
        });

        let maxLength = Math.min(ProductsName.length, ProductsPrice.length, ProductsRating.length);
        let exceldata = [['Title', 'Price', 'Rating']];
        for (let i = 0; i < maxLength; i++) {
            let innerdata = [ProductsName[i] || 'N/A', ProductsPrice[i] || 'N/A', ProductsRating[i] || 'N/A'];
            exceldata.push(innerdata);
        }

        console.log(exceldata);

        const workbook = xlsx.utils.book_new();
        const sheet = xlsx.utils.aoa_to_sheet(exceldata);
        xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1');
        xlsx.writeFile(workbook, 'output.xlsx');

    } catch (error) {
        console.error("Error reading file or processing data:", error);
    }
}

// Start the process
processData();
