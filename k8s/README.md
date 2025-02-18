# Guia de deploy helm + k8s

## Pré-requisitos

- [Helm](https://helm.sh/docs/intro/install/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [K8s](https://kubernetes.io/docs/setup/)
- [Docker](https://docs.docker.com/get-docker/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)

## Passo a passo

1. Acesse a pasta `k8s`

2. Instale o chart **lanchonete-api**:

```bash
helm install lanchonete-api ./lanchonete-api
```
