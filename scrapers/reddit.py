import praw
import time
import prawcore
import json

# Create a new Reddit instance with your authentication details
reddit = praw.Reddit(
    client_id='aR014rj_Lwkf9TG8OPwoew',
    client_secret='ZUr-M84TJOVGrRJ_iKa_VCdMC4ialg',
    user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
)

# Define list of subreddits to scrape
subreddit_list = ['csmajors', 'tech', 'GPT3', 'cscareers', 'mildlyinfuriating']

# Initialize the JSON data structure
reddit_data = {
    "title": "Reddit Feed",
    "link": "https://www.reddit.com",
    "items": []
}

# Iterate through each subreddit in the list
for subreddit_name in subreddit_list:
    subreddit = reddit.subreddit(subreddit_name)

    try:
        # Get posts from subreddit in the last 24 hours
        new_posts = subreddit.new(limit=None)
        for post in new_posts:
            if post.created_utc > time.time() - 86400:
                reddit_data["items"].append({
                    "title": post.title,
                    "description": post.selftext,
                    "author": str(post.author),
                    "score": post.score,
                    "created_utc": post.created_utc,
                    "permalink": post.permalink,
                    "url": post.url,
                    "subreddit": str(post.subreddit),
                    "id": post.id,
                })

    except prawcore.exceptions.NotFound:
        print(f"Subreddit {subreddit_name} not found.")

# Save the Reddit data to a JSON file
with open('reddit_posts.json', 'w', encoding='utf-8') as f:
    json.dump(reddit_data, f, ensure_ascii=False, indent=4)

# Print out all subreddit posts
print("Finished collecting Reddit posts")
