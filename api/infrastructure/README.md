# Cinema API Infrastructure

This directory contains the Docker Compose configuration for the Cinema API infrastructure services.

## Services

| Service   | Description                          | Port |
| --------- | ------------------------------------ | ---- |
| postgres  | PostgreSQL 16 database               | 5433 |
| zookeeper | Apache Zookeeper (required by Kafka) | 2181 |
| kafka     | Apache Kafka message broker          | 9092 |
| kafka-ui  | Web UI for Kafka debugging           | 8080 |

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setup

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Adjust the `.env` file if needed (default values work out of the box).

### Start Infrastructure

```bash
docker-compose up -d
```

### Stop Infrastructure

```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Start)

```bash
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f postgres
docker-compose logs -f kafka
```

## Kafka UI

Access Kafka UI at: [http://localhost:8080](http://localhost:8080)

Features:

- View topics and messages
- Create new topics
- Monitor consumer groups
- View broker metrics

## Connecting Services

### PostgreSQL Connection

| Parameter | Value                                         |
| --------- | --------------------------------------------- |
| Host      | localhost (or `postgres` from Docker network) |
| Port      | 5433                                          |
| Database  | cinema_identity                               |
| Username  | postgres                                      |
| Password  | postgres                                      |

Connection string:

```
postgresql://postgres:postgres@localhost:5433/cinema_identity
```

### Kafka Connection

| Parameter        | Value                                |
| ---------------- | ------------------------------------ |
| Bootstrap Server | localhost:9092 (external)            |
| Bootstrap Server | kafka:29092 (from Docker network)    |
| Zookeeper        | localhost:2181 (external)            |
| Zookeeper        | zookeeper:2181 (from Docker network) |

## Port Mappings

| Service    | Internal Port | External Port |
| ---------- | ------------- | ------------- |
| PostgreSQL | 5433          | 5433          |
| Zookeeper  | 2181          | 2181          |
| Kafka      | 9092, 29092   | 9092          |
| Kafka UI   | 8080          | 8080          |

## Troubleshooting

### Check Service Health

```bash
docker-compose ps
```

### Kafka Not Starting

If Kafka fails to start, ensure Zookeeper is running first:

```bash
docker-compose up -d zookeeper
# Wait a few seconds
docker-compose up -d kafka
```

### Reset Everything

```bash
docker-compose down -v
docker-compose up -d
```
