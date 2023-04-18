import os
import requests
import json
import time

# Enter your API keys and bearer token here
API_KEY = "8wdVMU9tSYmXBoZ8vlMc6TxRj"
API_SECRET_KEY = "WIEoqeKClvgPfrIixC0nDFeiVD2u3HOsWqDOF6irRTB6sZiRel"
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAAR%2FlgEAAAAAw5Oc7hascyrXFmcyNyuCvXLU5O8%3DOsLYeQ1gxtZsfaiB7kLpNXRZtBkJvJ0Uy0AjxIiNvSepnfElu6"
ACCESS_TOKEN = "1295964049214185472-eH6k1L1qUvRR9PUg5OzKjEdwHo2MYj"
ACCESS_TOKEN_SECRET = "xEOKzYLpQw7vYnqeYbzJAoBUrQWI8cRH8fJ9hU72tI0OR"

# Set up the endpoint URL and query parameters
endpoint_url = "https://api.twitter.com/2/tweets/search/recent"
query_params = {
    'query': '(politics OR "technology" OR "news" OR "ai" OR "machinelearning") -is:retweet -is:reply',
    'max_results': '100',
    'tweet.fields': 'created_at,public_metrics'
}

# Set up the headers with the bearer token and API key
headers = {
    "Authorization": f"Bearer {BEARER_TOKEN}",
    "User-Agent": "v2FilteredStreamPython"
}

# Initialize the JSON data structure
tweet_data = {
    "title": "Twitter Feed",
    "link": "https://twitter.com",
    "items": []
}

# Keep track of the number of tweets we've collected
num_tweets = 0

while num_tweets < 500:
    # Make the request
    response = requests.get(endpoint_url, headers=headers, params=query_params)

    # Check the response status code
    if response.status_code != 200:
        raise Exception(f"Request returned an error: {response.status_code} {response.text}")

    # Parse the response JSON data
    response_data = response.json()
    tweets = response_data['data']
    
    # Add the tweet data to the JSON data structure
    for tweet in tweets:
        tweet_data["items"].append({
            "title": tweet['text'],
            "link": f"https://twitter.com/i/web/status/{tweet['id']}",
            "created_at": tweet['created_at'],
            "retweet_count": tweet['public_metrics']['retweet_count'],
            "reply_count": tweet['public_metrics']['reply_count'],
            "like_count": tweet['public_metrics']['like_count']
        })
        num_tweets += 1
    
    # Set the query parameter to the ID of the oldest tweet we received to get the next set of tweets
    query_params['until_id'] = tweets[-1]['id']
    
    # Print the progress
    print(f"Collected {num_tweets} tweets")
    
    # Wait for 5 seconds before making the next request
    time.sleep(5)

# Save the tweet data to a JSON file
with open('tweets.json', 'w', encoding='utf-8') as f:
    json.dump(tweet_data, f, ensure_ascii=False, indent=4)

print("Finished collecting tweets")

