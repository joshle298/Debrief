import requests
import time

# define function to get posts from a page
def get_posts_from_page(page_num):
    url = f"https://hn.algolia.com/api/v1/search_by_date?tags=story&page={page_num}"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    posts = []
    for hit in data["hits"]:
        if hit["created_at_i"] > time.time() - 86400:
            post_info = {
                "title": hit["title"],
                "author": hit["author"],
                "points": hit["points"],
                "created_at": hit["created_at"],
                "link": hit["url"],
                "id": hit["objectID"],
            }
            posts.append(post_info)
    return posts

# define function to get all posts from all pages
def get_all_posts():
    all_posts = []
    page_num = 0
    while True:
        page_num += 1
        posts = get_posts_from_page(page_num)
        if not posts:
            break
        all_posts.extend(posts)
    return all_posts

# get all posts from the last 24 hours
all_posts = get_all_posts()

# print the results
for post in all_posts:
    print(post)
