# Trumail
![Logo](/src/assets/tru.png)
---
## Table of Contents 
1. [General Info](#general-info)
2. [Screenshots](#screenshots)
3. [Project Setup](#project-setup)
4. [Upcoming Features](#upcoming-features)

---
## General info
Frontend of the Golang-Zincsearch project, consists of processing all the files in a dataset called "**Enron Email Dataset**" to later add it to the Zincsearch search engine.


You can get more information about the dataset [here](https://www.cs.cmu.edu/~enron/) and for direct download click [here](http://www.cs.cmu.edu/~enron/enron_mail_20110402.tgz) (423MB)

##### [Backend Project](https://github.com/jhoserpacheco/golang-zincsearch-backend.git)

---
## Screenshots
Home Trumail without any email selected.

![Trumail](/public/Trumail.png)

Trumail searching for the word "Colombia" and selecting an email in the indexer.

![Trumail-search-Colombia](/public/Trumail%20search%20Colombia.png)

Bulk/ Create an index placing the name and records in ndjson format

![Trumail-search-Email](/public/Bulk%20Index%20Document.png)

---
## Project Setup

### Clone repository
```sh
git clone https://github.com/jhoserpacheco/golang-zincsearch-frontend.git
cd golang-zincsearch-frontend
```
### Install dependencies 
```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
➜ http://localhost:5173/
```
---
## Upcoming Features 
- Option to upload file in .ndjson format, process it and then create an index
- In the search engine, indicate in which index you want to search