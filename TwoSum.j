var twoSum = function(nums, target) {
    let dic={}
    for(let i=0;i<nums.length;i++){
        if (target-nums[i] in dic){
            return [dic[target-nums[i]],i]
        }
        dic[nums[i]]=i
    }
};

