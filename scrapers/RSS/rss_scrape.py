# using beautiful soup and requests
# go to https://blog.feedspot.com/rss_directory/a/ then /b/ then /c/ etc
# for each page find all the td elements with class "cat-col-1" and get the href within

import requests
from bs4 import BeautifulSoup


def get_rss_links():
    rss_links = []
    for letter in range(ord("a"), ord("z") + 1):
        letter = chr(letter)
        print(letter)
        url = f"https://blog.feedspot.com/rss_directory/{letter}/"
        r = requests.get(url)
        soup = BeautifulSoup(r.text, "html.parser")
        for td in soup.find_all("td", class_="cat-col-1"):
            rss_links.append(td.find("a")["href"])
    return rss_links


# get rss links from https://blog.feedspot.com/usa_news_rss_feeds/
# within the page, find all the a links with the "ext" class and no other classes
# and get the href attribute


def has_only_ext_class(tag):
    return tag.has_attr("class") and tag["class"] == ["ext"]


def get_usa_rss_links():
    url = "https://blog.feedspot.com/technology_rss_feeds/"
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    rss_links = []
    # get all the a tags with the "ext" class and no other classes
    for a in soup.find_all(has_only_ext_class):
        rss_links.append(a["href"])
    return rss_links


# given a list of urls, save as a file
def save_urls(urls, filename):
    with open(filename, "w") as f:
        for url in urls:
            f.write(url)
            f.write("\n")


# given a rss url, get the headline and description from the feed for itemn from the last 24 hours
def rss_data_from_url(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "lxml-xml")
    data = []
    for item in soup.find_all("item"):
        # print(item.title.text)
        # print(item.description.text if item.description else "")
        # data.append((item.title.text, item.description.text))
        description = ""
        if item.description:
            description = item.description.text
        # if description starts with < then treat it as html and extract the text
        if description.startswith("<"):
            description = BeautifulSoup(description, "html.parser").text
            # also replace the \u#### with the actual character
        print(description)
        description = description.encode("unicode_escape").decode("utf-8")
        print(description)
        data.append(
            {
                "title": item.title.text,
                "description": description,
                "link": item.link.text,
                "pubDate": item.pubDate.text if item.pubDate else "",
            }
        )
    return {
        "title": soup.title.text,
        "link": soup.link.text,
        "items": data,
    }


if __name__ == "__main__":
    links = get_usa_rss_links()
    save_urls(links, "scrapers/RSS/tech_news_rss_links.txt")
    for link in links[0:5]:
        # save to file
        rss_data = rss_data_from_url(link)
        with open(f"data_sources/{rss_data['title']}_rss_data.json", "w") as f:
            import json

            json.dump(rss_data, f)
