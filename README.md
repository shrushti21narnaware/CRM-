 CRM AI Compiler

A compiler-inspired AI system that converts natural language product requirements into structured, validated, and executable application configurations.

---
 🚀 Overview
This project is designed as a **multi-stage software generation pipeline**, not a simple prompt-to-output generator. It transforms open-ended instructions into reliable configurations for:

- UI Schema
- API Schema
- Database Schema
- Authentication Rules
- Business Logic

The goal is to behave like a **compiler for software generation**:

🎯 Objectives
Unlike basic AI wrappers, this system focuses on:

- Reliability  
- Deterministic generation  
- Validation  
- Error repair  
- Cross-layer consistency  
- Execution awareness  

---

🛠️ Features
Multi-Stage Generation Pipeline
1. User Prompt  
2. Intent Extraction  
   - Extracts structured intent from vague natural language input.    
3. System Design Layer
   - Converts intent into application architecture (entities, pages, roles, permissions, workflows).  
4. Schema Generation
   - UI Schema: pages, layouts, components  
   - API Schema: endpoints, request methods, validations  
   - Database Schema: tables, fields, relationships  
   - Auth Schema: roles, permissions, access control  
5. Validation Engine 
   - Validates JSON correctness, schema completeness, cross-layer consistency, logical mismatches.  
   - Example: API references `contacts` but DB schema lacks `contacts` table.  
6. Repair Engine
   - Repairs only invalid parts instead of regenerating everything.  
   - Example: Missing `contacts` table → auto-add `contacts` table.  
7. Runtime Simulation 
   - Validates execution readiness by simulating API routes, database availability, auth compatibility, UI connectivity.  

---

 🧑‍💻 Tech Stack
- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js, Express  
- Validation: AJV  
- Deployment: Render  
- Version Control: GitHub  
- AI Integration: Gemini API (planned/optional)  

---

⚡ Capabilities
- Handles vague prompts, conflicting requirements, missing details, incomplete specifications.

 📊 Metrics Tracked
- Success rate  
- Retries  
- Repair count  
- Latency  
- Validation failures  

---

 🔒 Deterministic Generation
- Same Input → Consistent Output  
- Cost vs Quality Tradeoff:  
- Single Prompt Generation → Low cost, poor reliability  
- Multi-Stage Pipeline → Medium cost, high reliability  
- Validation + Repair → Slightly higher cost, strong reliability  

---
🖥️ How to Run Locally
```bash
# Install dependencies
npm install

# Start server
npm start

# Open in browser
http://localhost:3000

🌐 Deployment
Deployed on Render.
Every GitHub push automatically triggers redeployment.

👩‍💻 Author
Shrushti Narnaware  
AI/ML Engineer
