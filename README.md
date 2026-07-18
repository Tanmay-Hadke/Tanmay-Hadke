<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F2027,50:2C5364,100:00C9A7&height=210&section=header&text=Tanmay%20Hadke&fontSize=52&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Data%20Scientist%20%7C%20Building%20Serverless%20GenAI%20Systems%20on%20AWS&descAlignY=58&descAlign=50" width="100%"/>

<a href="https://www.linkedin.com/in/tanmay-hadke/">
  <img src="https://img.shields.io/badge/LinkedIn-tanmay--hadke-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
<a href="https://github.com/Tanmay-Hadke">
  <img src="https://img.shields.io/badge/GitHub-Tanmay--Hadke-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>
<img src="https://img.shields.io/badge/CGPA-9.84%2F10-2ea44f?style=for-the-badge" />
<img src="https://komarev.com/ghpvc/?username=Tanmay-Hadke&style=for-the-badge&color=00C9A7&label=PROFILE+VIEWS" />

<br/>

<a href="https://github.com/Tanmay-Hadke">
  <img src="https://readme-typing-svg.demolab.com/?lines=Serverless+GenAI+%2B+MLOps+on+AWS;RAG+%7C+LLM+Agents+%7C+Vector+Search;Bioinformatics+%C3%97+Cloud+Data+Engineering;Turning+%240+AWS+Free+Tier+into+Production+Systems;M.S.+Data+Science+Graduate&font=Fira+Code&center=true&width=650&height=45&color=00C9A7&vCenter=true&size=22&pause=1200&duration=2600" alt="Typing SVG" />
</a>

</div>

<br/>

## 🎯 About Me

I'm a Computer Science graduate (**9.84 CGPA**) currently pursuing a **Master's in Data Science**, and my work sits at the intersection of three things: **cloud-native architecture, applied ML/GenAI, and data engineering**. Rather than just training models in notebooks, I ship them — as serverless pipelines on AWS, agentic multi-step workflows, and retrieval systems wired up to real LLMs.

Most of my recent builds share the same DNA: **zero-server, scale-to-zero AWS backends** (Lambda + API Gateway + DynamoDB/S3/Athena) fronting fast open-weight LLM inference (Groq/Llama), with an MLOps layer for evaluation baked in rather than bolted on.

```yaml
role:         Aspiring Data Scientist & Cloud-Native ML Engineer
currently:    M.S. Data Science (in progress)
focus_areas:  [GenAI Systems, RAG, Agentic Pipelines, Serverless MLOps, Bioinformatics Data]
ask_me_about: [Predictive Modelling, LLM Orchestration, AWS Serverless, Vector Search, Statistics]
philosophy:   "Every model deserves a production home, not just a notebook."
```

<br/>

## 🏗️ How My Projects Are Wired Together

Almost every build below follows the same production pattern — decoupled storage, serverless compute, and an external LLM for inference:

```mermaid
flowchart LR
    A[Client / Frontend<br/>HTML · JS · Gradio] -->|HTTPS| B(Amazon API Gateway)
    B --> C[AWS Lambda<br/>Python 3.12]
    C --> D{{Groq LPU Inference<br/>Llama 3.x / 4 Scout}}
    C --> E[(Amazon DynamoDB<br/>metadata + results)]
    F[Amazon S3<br/>raw data / uploads] --> G[Amazon Athena<br/>schema-on-read SQL]
    G --> H[Metabase<br/>BI Dashboard]
    C -.->|MLOps eval| I[/LLM-as-Judge<br/>quality scoring/]

    style A fill:#0F2027,stroke:#00C9A7,color:#fff
    style C fill:#2C5364,stroke:#00C9A7,color:#fff
    style D fill:#00C9A7,stroke:#0F2027,color:#000
    style B fill:#203A43,stroke:#00C9A7,color:#fff
```

<br/>

## 🚀 Featured Projects

<table>
<tr>
<td width="50%" valign="top">

### 👁️ [Multimodal Video RAG](https://github.com/Tanmay-Hadke/MultiModalVideoRag)
Search any video in **plain English** — *"show me a person falling"* returns the exact timestamp. No manual scrubbing, no labels.

`CLIP` `ChromaDB` `Groq Llama-4 Scout Vision` `Gradio`

**Pipeline:** frame sampling → CLIP embeddings → cosine search in ChromaDB → vision-LLM summary

</td>
<td width="50%" valign="top">

### 🧠 [GenAI Research Assistant](https://github.com/Tanmay-Hadke/genai-reseach-assistant)
Serverless app that ingests research PDFs and auto-summarizes them, with a continuous **LLM-as-a-Judge** evaluation loop.

`AWS Lambda` `API Gateway` `DynamoDB` `S3 Pre-signed URLs` `Groq Llama 3.3 70B`

**Result:** 100% structural compliance · 5.0/5.0 avg. quality score (automated eval)

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🧬 [BioML Course Generator](https://github.com/Tanmay-Hadke/aws-BioML-Course-Generator)
A 4-agent chained pipeline (Curriculum Architect → Professor → Lab Instructor → MLOps Validator) that generates and *validates* university-level bioinformatics curricula end to end.

`AWS Step Functions` `Lambda` `DynamoDB` `API Gateway`

</td>
<td width="50%" valign="top">

### 🚀 [Serverless Marketing Copy Generator](https://github.com/Tanmay-Hadke/Marketing-AI-App)
Turns a product description into platform-optimized ad copy (Twitter/LinkedIn/Instagram) with strict JSON-enforced LLM output — zero external Python dependencies.

`AWS Lambda` `API Gateway` `DynamoDB` `Groq Llama-3.1`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ☁️ [Bioinformatics Data Lake on AWS](https://github.com/Tanmay-Hadke/aws-bioinformatics-datalake)
A fully serverless, Free-Tier data lake for querying and visualizing gene-expression datasets straight off S3.

`Amazon S3` `Athena` `IAM` `Docker + Metabase` `SQL`

**Architecture:** Medallion-lite — S3 (storage) → Athena (schema-on-read SQL) → Metabase (BI)

</td>
<td width="50%" valign="top">

### 📚 Explore More
26 public repositories spanning ML/DL experiments, statistics, and dashboarding.

<a href="https://github.com/Tanmay-Hadke?tab=repositories">
<img src="https://img.shields.io/badge/View_All_Repositories-00C9A7?style=for-the-badge&logo=github&logoColor=white"/>
</a>

</td>
</tr>
</table>

<br/>

## 🛠️ Tech Stack

<div align="center">

**Languages & Data**

<img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"/>
<img src="https://img.shields.io/badge/R-276DC3?style=for-the-badge&logo=r&logoColor=white"/>
<img src="https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"/>


**Cloud & Serverless (AWS)**

<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
<img src="https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS%20Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon%20Athena-8C4FFF?style=for-the-badge&logo=amazon&logoColor=white"/>
<img src="https://img.shields.io/badge/API%20Gateway-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white"/>
<img src="https://img.shields.io/badge/Step%20Functions-FF9900?style=for-the-badge&logo=amazon&logoColor=white"/>

**AI / ML / GenAI**

<img src="https://img.shields.io/badge/PyTorch-EE4C2C.svg?style=for-the-badge&logo=pytorch&logoColor=white"/>
<img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=tensorflow&logoColor=white"/>
<img src="https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white"/>
<img src="https://img.shields.io/badge/mlflow-%23d9ead3.svg?style=for-the-badge&logo=numpy&logoColor=blue"/>
<img src="https://img.shields.io/badge/Groq%20LPU-F55036?style=for-the-badge&logoColor=white"/>
<img src="https://img.shields.io/badge/LLaMA-0467DF?style=for-the-badge&logo=meta&logoColor=white"/>
<img src="https://img.shields.io/badge/CLIP-412991?style=for-the-badge&logo=openai&logoColor=white"/>
<img src="https://img.shields.io/badge/ChromaDB-1C1C1C?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Gradio-F97316?style=for-the-badge&logo=gradio&logoColor=white"/>

**Tools & BI**

<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white"/>
<img src = "https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white"/>
<img src="https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white"/>
<img src="https://img.shields.io/badge/Metabase-509EE3?style=for-the-badge&logo=metabase&logoColor=white"/>
<img src="https://img.shields.io/badge/Power%20BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black"/>
<img src="https://img.shields.io/badge/Tableau-E97627?style=for-the-badge&logo=tableau&logoColor=white"/>
<img src="https://img.shields.io/badge/Looker%20Studio-4285F4?style=for-the-badge&logo=looker&logoColor=white"/>
<img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
<img src="https://img.shields.io/badge/PyCharm-000000?style=for-the-badge&logo=pycharm&logoColor=white"/>

</div>

<br/>

## 📊 GitHub Analytics
 
<div align="center">
<img src="https://github-readme-stats-o6iaohgwy-tanmay-hadkes-projects.vercel.app/api?username=Tanmay-Hadke&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00C9A7&icon_color=00C9A7&text_color=c9d1d9&cache_seconds=86400" height="165"/>
<img src="https://github-readme-streak-stats.herokuapp.com/?user=Tanmay-Hadke&theme=tokyonight&hide_border=true&background=0D1117&ring=00C9A7&fire=00C9A7&currStreakLabel=00C9A7" height="165"/>
</div>
<div align="center">
<img src="https://github-readme-stats-o6iaohgwy-tanmay-hadkes-projects.vercel.app/api/top-langs/?username=Tanmay-Hadke&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00C9A7&text_color=c9d1d9&cache_seconds=86400" height="165"/>
</div>
<div align="center">
<img src="https://github-readme-activity-graph.vercel.app/graph?username=Tanmay-Hadke&theme=tokyo-night&hide_border=true&bg_color=0D1117&color=00C9A7&line=00C9A7&point=ffffff" width="95%"/>
</div>
<br/>



## 📊 Certifications & Achievements

| Certification | Issuer |
|---|---|
| 🥇 SQL Gold Badge | HackerRank |
| 🥈 Python Silver Badge | HackerRank |
| [SQL Intermediate](https://www.hackerrank.com/certificates/70457cdc3b48) | HackerRank |
| [SQL Basics](https://www.hackerrank.com/certificates/8e23d79e8749) | HackerRank |
| [Python Basics](https://www.hackerrank.com/certificates/a55cbafd0b3e) | HackerRank |

<br/>

## 🔬 Research Contribution

**[Applications of Quantum Dots](https://www.ijset.in/wp-content/uploads/IJSET_V12_issue3_576.pdf)** — *International Journal of Scientific Engineering & Technology*

> Explores quantum dots (fluorescent nanocrystals) and their role in biomedical imaging, drug delivery, and quantum-dot display technology, with a focus on Graphene Quantum Dots (GQDs) as a carbon-based variant.

<br/>

<div align="center">

## 📫 Let's Connect

<a href="https://www.linkedin.com/in/tanmay-hadke/">
  <img src="https://img.shields.io/badge/Connect%20on%20LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<br/><br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00C9A7,50:2C5364,100:0F2027&height=100&section=footer" width="100%"/>

</div>
