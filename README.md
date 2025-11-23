# Finure App Frontend

## 1. Overview
Finure app frontend is the user interface for the Finure platform, built with React, Vite, Tailwind CSS and TypeScript. It provides a modern, responsive experience for users to interact with credit card application workflows. The frontend is designed to run as a Kubernetes Deployment, leveraging Helm charts for deployment and configuration.

## 2. Features
- **Modern UI:** Built with React, Vite, Tailwind CSS, and shadcn/ui for fast, responsive interfaces
- **Component-Based Architecture:** Organized into reusable components, pages, hooks, and libraries
- **Kubernetes Native:** Runs as a Deployment in a Kubernetes cluster, with Helm charts for deployment and configuration
- **Environment Configuration:** Supports environment-specific values for flexible deployments
- **Kubernetes Gateway API:** Uses Kubernetes Gateway API with Istio Controller
- **Blue/Green Progressive Delivery:** Leverages Flagger for Blue/Green progressive delivery with smoke and load tests

## 3. Prerequisites
- Kubernetes cluster bootstrapped ([Finure Terraform](https://github.com/finure/terraform))
- Infrastructure setup via Flux ([Finure Kubernetes](https://github.com/finure/kubernetes))

## 4. File Structure
```
app-frontend/
├── src/
│   ├── components/                     # Reusable UI components
│   ├── pages/                          # Application pages/views
│   ├── hooks/                          # Custom React hooks
│   ├── lib/                            # Utility libraries
│   ├── assets/                         # Static assets (images, fonts, etc)
│   └── main.tsx                        # App entry point
├── public/                             # Static files (robots.txt, placeholder.svg, etc)
├── k8s/
│   ├── environments/
│   │   └── production/
│   │       └── values.yaml             # Production environment values handled by CI/CD
│   ├── helm-charts/
│   │   └── app-frontend/
│   │       ├── .helmignore
│   │       ├── Chart.yaml              # Helm chart metadata
│   │       ├── values.yaml             # Default Helm values
│   │       └── templates/
│   │           ├── _helpers.tpl        # Helm template helpers
│   │           ├── deployment.yaml     # Kubernetes Deployment manifest
│   │           ├── hpa.yaml            # Horizontal Pod Autoscaler
│   │           ├── ingress.yaml        # HTTP Route definition for ingress
│   │           ├── progressive.yaml    # Flagger for Blue/Green progessive delivery
│   │           └── service.yaml        # Service definition for frontend
│   └── scripts/
│       ├── istio.sh                    # Istio setup script
│       └── probe.sh                    # Readiness/Liveness probe script
├── Dockerfile                          # Container build file
├── package.json                        # Project dependencies and scripts
├── README.md                           # Project documentation
└── ...other config files
```

## 5. How to Run Manually

> **Note:** Manual execution is for development/testing only. Production use is via Kubernetes Deployment.

1. Install dependencies:
	```bash
	cd app-frontend
	npm install
	```
2. Run the frontend service:
	```bash
	npm run dev
	```
	This will:
	- Start the Vite development server	

## 6. k8s Folder Significance

The `k8s` folder contains all Kubernetes-related resources:
- **Helm Charts:** Used to deploy the frontend as a Kubernetes Deployment in the cluster. Not intended for standalone or local use.
- **Environment Values:** Customize deployments for different environments (e.g., production)
- **Scripts:** Utility scripts for cluster setup (e.g., Istio service mesh, readiness/liveness probes)

> **Important:** The resources in `k8s` are designed to be consumed by the Kubernetes cluster during automated deployments. They are not meant for manual execution outside the cluster context.

## Additional Information

This repo is primarily designed to be used in the Finure project. While the frontend can be adapted for other use cases, it is recommended to use it as part of the Finure platform for full functionality and support.