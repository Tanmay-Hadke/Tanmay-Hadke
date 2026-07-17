<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,50:2c5364,100:00c9ff&height=220&section=header&text=Tanmay%20Hadke&fontSize=55&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=GenAI%20%7C%20Cloud%20%7C%20Data%20Science&descAlignY=58&descSize=20" width="100%"/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=2800&pause=900&color=00C9FF&center=true&vCenter=true&width=760&lines=Applied+GenAI+%26+MLOps+Engineer;Building+Serverless+AI+Pipelines+on+AWS;RAG+%7C+Multi-Agent+Systems+%7C+LLM+Inference;Computer+Science+Grad+%E2%80%A2+9.84+CGPA+%E2%80%A2+MS+in+Data+Science" alt="Typing SVG" />
</a>

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-tanmay--hadke-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tanmay-hadke)
[![Profile Views](https://komarev.com/ghpvc/?username=Tanmay-Hadke&style=for-the-badge&color=00C9FF&label=PROFILE+VIEWS)](https://github.com/Tanmay-Hadke)
[![GitHub followers](https://img.shields.io/github/followers/Tanmay-Hadke?style=for-the-badge&color=2c5364&labelColor=0f2027)](https://github.com/Tanmay-Hadke?tab=followers)

</div>

---

### 👋 About Me

I'm a Computer Science graduate (**9.84 CGPA**) currently pursuing a **Master's in Data Science**, and my work has evolved from classical ML/statistics into **applied Generative AI and serverless cloud engineering**. Most of what I ship follows the same philosophy: *scale-to-zero infrastructure, LLM inference where it earns its keep, and pipelines that don't fall over the moment traffic shows up.*

- 🧠 **Currently building:** multi-agent LLM pipelines, RAG systems, and event-driven AWS architectures
- ☁️ **Comfort zone:** AWS Lambda, API Gateway, DynamoDB, S3, Step Functions, Athena
- 🤖 **AI stack:** Groq (Llama 3.x / 4 Scout), CLIP embeddings, ChromaDB, LLM-as-a-Judge evaluation
- 📊 **Foundations:** predictive modelling, statistical analysis, regression/classification/clustering
- 🌱 **Always exploring:** MLOps validation patterns, vector search, and cost-efficient inference design

---

### 🧩 A Pattern in My Work

Looking across my recent projects, a common serverless blueprint keeps showing up — I design most GenAI apps around the same lean, event-driven backbone:

```mermaid
flowchart LR
    A[Client<br/>HTML / JS] -->|HTTPS| B[Amazon API Gateway]
    B --> C[AWS Lambda<br/>Python 3.12]
    C -->|Prompt| D[Groq LPU Inference<br/>Llama 3.x / 4 Scout]
    D -->|Response| C
    C --> E[(Amazon DynamoDB)]
    C -.-> F[Amazon S3<br/>Data Lake]
    F --> G[Amazon Athena<br/>SQL Analytics]
    G --> H[Metabase<br/>Dashboards]

    style A fill:#0f2027,stroke:#00C9FF,color:#fff
    style B fill:#203a43,stroke:#00C9FF,color:#fff
    style C fill:#2c5364,stroke:#00C9FF,color:#fff
    style D fill:#0f2027,stroke:#00C9FF,color:#fff
    style E fill:#203a43,stroke:#00C9FF,color:#fff
    style F fill:#203a43,stroke:#00C9FF,color:#fff
    style G fill:#2c5364,stroke:#00C9FF,color:#fff
    style H fill:#0f2027,stroke:#00C9FF,color:#fff
```

**Zero idle cost. Zero server management. Pay only when it's actually being used.**

---

### 🚀 Featured Projects

<table>
<tr>
<td width="50%" valign="top">

**👁️ [Multimodal Video RAG](https://github.com/Tanmay-Hadke/MultiModalVideoRag)**
Search any video with plain English — *"show me a person falling"* — and get back the exact timestamp. Frame sampling → CLIP embeddings → ChromaDB cosine search → Groq Vision auto-summary, wrapped in a Gradio UI.

`Python` `CLIP` `ChromaDB` `Groq Llama-4 Scout` `Gradio`

</td>
<td width="50%" valign="top">

**🧬 [BioML Course Generator](https://github.com/Tanmay-Hadke/aws-BioML-Course-Generator)**
A 4-agent chained workflow orchestrated by AWS Step Functions that architects a syllabus, writes lecture notes, generates working code, and validates it before persisting to DynamoDB — a small MLOps pipeline for AI-generated curricula.

`AWS Step Functions` `Lambda` `DynamoDB` `API Gateway`

</td>
</tr>
<tr>
<td width="50%" valign="top">

**📄 [GenAI Research Assistant](https://github.com/Tanmay-Hadke/genai-reseach-assistant)**
Serverless research-paper summarizer with pre-signed S3 uploads (bypassing API Gateway's 10MB cap) and an automated **LLM-as-a-Judge** evaluation loop — currently holding a 5.0/5.0 quality baseline with 100% output-format compliance.

`AWS Lambda` `DynamoDB` `Groq Llama 3.3 70B` `MLOps`

</td>
<td width="50%" valign="top">

**📢 [Marketing AI App](https://github.com/Tanmay-Hadke/Marketing-AI-App)**
Turns a product description into platform-tuned ad copy (Twitter/LinkedIn/Instagram) via JSON-enforced LLM output — dependency-free Python backend, scale-to-zero by design.

`Lambda` `API Gateway` `DynamoDB` `Groq Llama-3.1`

</td>
</tr>
<tr>
<td colspan="2" valign="top">

**☁️ [Serverless Bioinformatics Data Lake](https://github.com/Tanmay-Hadke/aws-bioinformatics-datalake)**
A Medallion-lite data lake for gene-expression data: S3 for storage, Athena for schema-on-read SQL, IAM for least-privilege access, and Metabase (Docker) for visualization — decoupling storage from compute end to end.

`Amazon S3` `Amazon Athena` `AWS IAM` `Docker` `Metabase` `SQL`

</td>
</tr>
</table>

<div align="center">
<sub>📌 Pinned repos shown above — <a href="https://github.com/Tanmay-Hadke?tab=repositories">explore all repositories →</a></sub>
</div>

---

### 🛠️ Tech Stack

<div align="center">

**Languages & Data**
<br/>
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=flat-square&logo=postgresql&logoColor=white)
![R](https://img.shields.io/badge/R-276DC3?style=flat-square&logo=r&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat-square&logo=jupyter&logoColor=white)

**Cloud & Infrastructure (AWS)**
<br/>
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white)
![API Gateway](https://img.shields.io/badge/API%20Gateway-FF4F8B?style=flat-square&logo=amazonapigateway&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)
![S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=flat-square&logo=amazons3&logoColor=white)
![Athena](https://img.shields.io/badge/Amazon%20Athena-232F3E?style=flat-square&logo=amazonaws&logoColor=white)
![Step Functions](https://img.shields.io/badge/Step%20Functions-CD2264?style=flat-square&logo=amazonaws&logoColor=white)
![IAM](https://img.shields.io/badge/AWS%20IAM-DD344C?style=flat-square&logo=amazoniam&logoColor=white)

**AI / GenAI / ML**
<br/>
![Groq](https://img.shields.io/badge/Groq%20LPU-F55036?style=flat-square&logoColor=white)
![OpenAI CLIP](https://img.shields.io/badge/CLIP-412991?style=flat-square&logo=openai&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6F00?style=flat-square)
![Gradio](https://img.shields.io/badge/Gradio-F97316?style=flat-square&logo=gradio&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikitlearn&logoColor=white)

**BI, Tools & DevOps**
<br/>
![Power BI](https://img.shields.io/badge/Power%20BI-F2C811?style=flat-square&logo=powerbi&logoColor=black)
![Tableau](https://img.shields.io/badge/Tableau-E97627?style=flat-square&logo=tableau&logoColor=white)
![Looker Studio](https://img.shields.io/badge/Looker%20Studio-4285F4?style=flat-square&logo=looker&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)
![PyCharm](https://img.shields.io/badge/PyCharm-000000?style=flat-square&logo=pycharm&logoColor=white)
![Excel](https://img.shields.io/badge/MS%20Excel-217346?style=flat-square&logo=microsoftexcel&logoColor=white)

</div>

---

### 📊 GitHub Analytics

<div align="center">

<img height="165" src="https://github-readme-stats.vercel.app/api?username=Tanmay-Hadke&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0f2027&title_color=00C9FF&icon_color=00C9FF&text_color=c9d1d9&cache_seconds=86400" />
<img height="165" src="https://streak-stats.demolab.com/?user=Tanmay-Hadke&theme=tokyonight&hide_border=true&background=0f2027&ring=00C9FF&fire=00C9FF&currStreakLabel=00C9FF" />

<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Tanmay-Hadke&layout=compact&theme=tokyonight&hide_border=true&bg_color=0f2027&title_color=00C9FF&text_color=c9d1d9&cache_seconds=86400" height="165"/>

</div>

---

### 🏆 Certifications & Achievements

- 🐍 [Python Basics](https://www.hackerrank.com/certificates/a55cbafd0b3e) — HackerRank
- 🗄️ [SQL Basics](https://www.hackerrank.com/certificates/8e23d79e8749) · [SQL Intermediate](https://www.hackerrank.com/certificates/70457cdc3b48) — HackerRank
- 🥇 **SQL Gold Badge** on HackerRank
- 🥈 **Python Silver Badge** on HackerRank

### 📝 Research Contribution

**[Applications of Quantum Dots](https://www.ijset.in/wp-content/uploads/IJSET_V12_issue3_576.pdf)** — a published study on fluorescent nanocrystals, covering their role in bio-medical imaging, drug delivery, and semiconductor optics, with a focus on Graphene Quantum Dots (GQDs).

---

<div align="center">

### 📫 Let's Connect

[![LinkedIn](https://img.shields.io/badge/-Tanmay%20Hadke-0A66C2?style=for-the-badge&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/tanmay-hadke)
[![GitHub](https://img.shields.io/badge/-Tanmay--Hadke-181717?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/Tanmay-Hadke)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00c9ff,50:2c5364,100:0f2027&height=120&section=footer" width="100%"/>

</div>
