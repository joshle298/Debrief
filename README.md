# Debrief
## :world_map: Overview
DeBrief, is a news insight synthesizer designed to cut the noise out of media consumption. We use LLMs and Embedded Mappings to map media hosted on multiple platforms (Twitter, RSS, Reddit, etc). By monitoring clusters and user preferences, the program summarizes what is relevant and delivers it in succinct terms. This solves the pain point many encounter of constantly scrolling through media to find the portions relevant to readers.

### 📱 Demo (Mobile)
https://github.com/joshle298/Debrief/assets/59464508/9a19f808-3ce8-46e1-ae1f-c394e8101f2a

### 📊 Text Embedding Map
https://github.com/joshle298/Debrief/assets/59464508/073cddd2-3f2e-4b9c-96f5-e0f7b67b784b

### ✏️ DFD (Data Flow Diagram)
<img width="986" alt="Screenshot 2023-07-09 at 3 52 56 PM" src="https://github.com/joshle298/Debrief/assets/59464508/8907c612-c558-4f64-b3fc-89f15f9a1433">

## :chart_with_upwards_trend: Interest
Generated over **88,000 impressions** on the [Debrief Announcement Tweet](https://twitter.com/minafahmi_/status/1642899127427125254?s=46&t=FEAelgSnjY-y4meDl6F6Xg) with a conversion of **100+ waitlist signups**.

## :door: Opportunity
- As a consumer-facing product: DeBrief crafts a unique media consumption experience for each user, tailoring the influx of news to cater specifically to their preferences. Unlike traditional news platforms that often suffer from topic repetition, DeBrief ensures a diverse and continuously refreshing array of information that aligns with the user's evolving interests (daily). This approach ensures users are exposed only to relevant and varied articles and information, enhancing their overall reading experience and saving them from the monotony of redundancy often prevalent in most news services today.
- Knowledge workers and finance professionals spend hours reading news, much of which is irrelevant. The current information extraction process is expensive and requires immense focus between reading the news and discovering relevant information. These workers have no automated way to cut through the noise and consume such large data. Augmenting knowledge workers’ workflow will increase productivity and ultimately require less labor to complete the same work.

## 🛠️ Todo
- Design and implement methods to collect user preferences (voting mechanism, browsing context, article feeds, etc.)
- Retrieve the 4 most relevant articles for each debrief and link them via photos
- Podcast form (ElevenLabs AI text to voice)
- Conversational feature (allow users to have a conversation with AI on questions that may arise during a debrief)
- Optimize OpenAI API call costs

## 🌐 Run DeBrief's Backend
1. Scraping services (Reddit, Twitter, RSS feeds, etc.)
   - run specific web scrapers via .py files within the 'scrapers' directory, output is .json files--_Note that as of June, many services have begun to crack down on web scraping (Reddit & Twitter), making the current program incompatible with them_
2. Create .env file with your own OpenAI API Key & Atlas Nomic API key
3. Change the local server addresses based on your internet's IP address in DebriefMobile/App.js & api.py _(for connection with mobile app)_
4. run `python embed_posts.py` or `python3 embed_posts.py`
5. run `python extract_posts.py` or `python3 extract_posts.py`
4. run `python api.py` or `python3 api.py` to begin running the service locally _(for connection with mobile app)_
5. Follow the mobile section below to continue with running the mobile app locally

## 💻 Run DeBrief Mobile (iOS or Android)

1. Install Expo Go onto your device
2.      cd DebriefMobile
3.      `expo start`
