function uniquePaths( m ,  n ) {
    if(m===1||n===1) return 1;
    const dp=Array(n);
    dp.fill(1,0,n);
    for(let i=1;i<m;i++){
        for(let j=1;j<n;j++){
            dp[j]+=dp[j-1];
        }
    }
    return dp[n-1];
    
}

uniquePaths(4,5)