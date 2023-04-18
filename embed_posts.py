from langchain.vectorstores import AtlasDB
from langchain.embeddings.openai import OpenAIEmbeddings
import nomic

import json
import uuid


# embeddings = OpenAIEmbeddings()

# text = "This is a test document."

# query_result = embeddings.embed_query(text)

# doc_result = embeddings.embed_documents([text])

# print(query_result)
# print(doc_result)

# embeddings = OpenAIEmbeddings()
# vectorstore = AtlasDB(
#     "headline_data",
#     None,
#     "soH2CVoStCGvI5wW4vSVRFszgpPgImpnuHfiWewTBce_H",
#     is_public=True,
#     reset_project_if_exists=True,
# )

nomic.login("Gqpc4gaUpPCh45uGQcCxoBtMiNfTjRMr0V-yIsYnhvC_0")

vectorstore = nomic.AtlasProject(
    name="headline_data_3",
    reset_project_if_exists=True,
    is_public=True,
    unique_id_field="id_field",
    modality="text",
)


import uuid
import json


from langchain.vectorstores import AtlasDB
from langchain.embeddings.openai import OpenAIEmbeddings
import nomic

import json
import uuid


# embeddings = OpenAIEmbeddings()

# text = "This is a test document."

# query_result = embeddings.embed_query(text)

# doc_result = embeddings.embed_documents([text])

# print(query_result)
# print(doc_result)

# embeddings = OpenAIEmbeddings()
# vectorstore = AtlasDB(
#     "headline_data",
#     None,
#     "soH2CVoStCGvI5wW4vSVRFszgpPgImpnuHfiWewTBce_H",
#     is_public=True,
#     reset_project_if_exists=True,
# )

nomic.login("Gqpc4gaUpPCh45uGQcCxoBtMiNfTjRMr0V-yIsYnhvC_0")

vectorstore = nomic.AtlasProject(
    name="headline_data_3",
    reset_project_if_exists=True,
    is_public=True,
    unique_id_field="id_field",
    modality="text",
)


import uuid
import json


def datafile_to_embedding_data(filename):
    with open(filename, "r") as f:
        data = json.load(f)
    print(filename)

    if isinstance(data, list):
        items = data
        feed_title = ""
        feed_link = ""
    else:
        items = data.get("items", [])
        feed_title = data["title"] if "title" in data else ""
        feed_link = data["link"] if "link" in data else ""

    metadata = [
        {
            "id_field": str(uuid.uuid4()),
            "embed_text": " - ".join([x["title"], x["description"]])
            if "description" in x
            else x["title"],
            "title": x["title"],
            "description": x["description"] if "description" in x else "",
            "link": x["link"] if "link" in x and x["link"] is not None else "",
            "pubDate": x["pubDate"] if "pubDate" in x else "",
            "feed_title": feed_title,
            "feed_link": feed_link,
        }
        for x in items
    ]
    return metadata



# cnn_metadata = datafile_to_embedding_data("data_sources/cnn_rss_data.json")
# techcrunch_metadata = datafile_to_embedding_data(
#     "data_sources/techcrunch_rss_data.json"
# )


# for each file in data_sources load the json and add it to the vectorstore
import os

for filename in os.listdir("data_sources"):
    if filename.endswith(".json"):
        metadata = datafile_to_embedding_data(os.path.join("data_sources", filename))
        vectorstore.add_text(data=metadata)

# add the following files in the same manner scrapers/hn.json, scrapers/reddit.json, scrapers/tweets.json
files = [
    "scrapers/hn.json",
    "scrapers/reddit_posts.json",
    "scrapers/tweets.json",
]
for filename in files:
    metadata = datafile_to_embedding_data(filename)
    vectorstore.add_text(data=metadata)

vectorstore.create_index(
    name="v1.1",
    indexed_field="embed_text",
    build_topic_model=True,
    topic_label_field="embed_text",
    colorable_fields=["feed_title", "id_field"],
)



# cnn_metadata = datafile_to_embedding_data("data_sources/cnn_rss_data.json")
# techcrunch_metadata = datafile_to_embedding_data(
#     "data_sources/techcrunch_rss_data.json"
# )


# for each file in data_sources load the json and add it to the vectorstore
import os

for filename in os.listdir("data_sources"):
    if filename.endswith(".json"):
        metadata = datafile_to_embedding_data(os.path.join("data_sources", filename))
        vectorstore.add_text(data=metadata)

# add the following files in the same manner scrapers/hn.json, scrapers/reddit.json, scrapers/tweets.json
files = [
    "scrapers/hn.json",
    "scrapers/reddit_posts.json",
    "scrapers/tweets.json",
]
for filename in files:
    metadata = datafile_to_embedding_data(filename)
    vectorstore.add_text(data=metadata)

vectorstore.create_index(
    name="v1.1",
    indexed_field="embed_text",
    build_topic_model=True,
    topic_label_field="embed_text",
    colorable_fields=["feed_title", "id_field"],
)
