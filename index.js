import { tweetsData } from './data.js'

const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
})

// so we want to add an event listener to listen for clicks on the document,
document.addEventListener('click', function(e){
    // so we wan to log out the content of the data-like attribute, .data-set to see what element the data has
    // if the element we are clicking on has a data attribute called like, if we click on anything that is not like, it  returns undefined
    if(e.target.dataset.like)
    handleLikeClick(e.target.dataset.like)
})

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    // so this flips a boolean from true to false and false to true
    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
        targetTweetObj.isLiked = false
    }else{
        targetTweetObj.likes++
        targetTweetObj.isLiked = true
    }
    // to refactor this code we can remove line 26 and 29 and keep line 32
    //targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
} 
function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
`
   })
   return feedHtml 
}
// or
        // const feed = document.getElementById('feed')
        // feed.innerHTML = getFeedHtml()
function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()
