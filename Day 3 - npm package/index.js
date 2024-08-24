function binary_Search(arr,target)
{
    let i=0;
    let j=arr.length-1;
    while(i<=j){
        let mid=Math.floor((i+j)/2);
        if(arr[mid]==target)
        {
            return mid;
        }
        else if(arr[mid]>target)
        {
            j=mid-1;
        }
        else{
            i=mid+1;
        }
    }
return -1;
}

module.exports = binary_Search;