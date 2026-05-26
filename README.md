AI App Config Compiler

A compiler-inspired AI system that converts natural language product requirements into structured, validated, and executable application configurations.

This project is designed as a multi-stage software generation pipeline, not a simple prompt-to-output generator.
It transforms open-ended instructions into reliable configurations for:

UI Schema
API Schema
Database Schema
Authentication Rules
Business Logic

Inspired by systems like:

Base44

Live Demo

Live Application

Objective

The goal of this project is to behave like a compiler for software generation:

Natural Language
        ↓
Intermediate Representation
        ↓
Structured Schemas
        ↓
Validation
        ↓
Repair
        ↓
Executable Configuration

Unlike basic AI wrappers, this system focuses on:

Reliability
Deterministic generation
Validation
Error repair
Cross-layer consistency
Execution awareness
Features
Multi-Stage Generation Pipeline

The system breaks generation into modular stages:

User Prompt
    ↓
Intent Extraction
    ↓
System Design Layer
    ↓
Schema Generation
    ↓
Validation Engine
    ↓
Repair Engine
    ↓
Runtime Simulation
    ↓
Final Executable Config
Intent Extraction

Extracts structured intent from vague natural language input.

Example:

Input
Build a CRM with login, dashboard, analytics, and payments.
Extracted Intent
{
  "app_type": "CRM",
  "features": [
    "login",
    "dashboard",
    "analytics",
    "payments"
  ]
}
System Design Layer

Converts intent into application architecture.

Includes:

entities
pages
roles
permissions
workflows
Schema Generation

Generates:

UI Schema
pages
layouts
components
API Schema
endpoints
request methods
validations
Database Schema
tables
fields
relationships
Auth Schema
roles
permissions
access control
Validation Engine

The system validates:

JSON correctness
required fields
schema completeness
cross-layer consistency
missing references
logical mismatches

Example:

API references "contacts"
but DB schema lacks "contacts" table
Repair Engine

Instead of blindly regenerating everything, the system repairs only the invalid parts.

Example:

Missing contacts table
→ auto-add contacts table

This improves:

reliability
latency
consistency
Runtime Simulation

The system validates execution readiness by simulating:

API routes
database availability
auth compatibility
UI connectivity

This ensures output is directly usable by a runtime system.

Tech Stack
Layer	Technology
Frontend	HTML, CSS, JavaScript
Backend	Node.js, Express
Validation	AJV
Deployment	Render
Version Control	GitHub
AI Integration	Gemini API (planned/optional)
Project Structure
src/
│
├── pipeline/
│   ├── intentExtractor.js
│   ├── systemDesigner.js
│   ├── schemaGenerator.js
│   ├── validator.js
│   ├── repairEngine.js
│   ├── consistencyChecker.js
│   ├── runtimeSimulator.js
│   └── orchestrator.js
│
├── schemas/
│   ├── uiSchema.json
│   ├── apiSchema.json
│   ├── dbSchema.json
│   └── authSchema.json
│
├── evaluation/
│   ├── prompts.json
│   ├── edgeCases.json
│   ├── metrics.json
│   └── runEvaluation.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── utils/
│   └── helpers.js
│
├── server.js
└── package.json
Example Output
{
  "ui_schema": {
    "pages": [
      "Login",
      "Dashboard",
      "Analytics"
    ]
  },

  "api_schema": {
    "endpoints": [
      "/login",
      "/contacts",
      "/payments"
    ]
  },

  "db_schema": {
    "tables": [
      "users",
      "contacts",
      "subscriptions"
    ]
  },

  "auth_schema": {
    "roles": [
      "admin",
      "user"
    ]
  }
}
Failure Handling

The system handles:

vague prompts
conflicting requirements
missing details
incomplete specifications

Example:

Input
Build an app
Response
{
  "clarification_needed": true,
  "questions": [
    "What type of app?",
    "What features are required?"
  ]
}
Evaluation Framework

The project includes:

10 real-world prompts
10 edge-case prompts

Metrics tracked:

success rate
retries
repair count
latency
validation failures
Deterministic Generation

The system is designed for stable outputs using:

modular generation
schema constraints
validation contracts
structured intermediate representation
low-temperature AI generation

Goal:

Same Input → Consistent Output
Cost vs Quality Tradeoff
Approach	Cost	Reliability
Single Prompt Generation	Low	Poor
Multi-Stage Pipeline	Medium	High
Validation + Repair	Slightly Higher	Strong Reliability

This project prioritizes:

correctness
consistency
execution readiness

over raw generation speed.

How To Run Locally
Install Dependencies
npm install
Start Server
npm start
Open Browser
http://localhost:3000
Deployment

The project is deployed on Render.

Every GitHub push automatically triggers redeployment.

Future Improvements
Real Gemini/OpenAI integration
Automatic frontend generation
Runtime code generation
Docker deployment
Multi-tenant support
YAML export
React frontend
Full execution engine
Agent-based planning
Author

Shrushti Narnaware

Computer Science Engineering (Data Science)

Prof. Ram Meghe College of Engineering and Management, Badnera

