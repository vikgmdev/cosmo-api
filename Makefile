ifndef ENV
$(error The ENV variable is missing.)
endif

ifeq ($(filter $(ENV),dev),)
$(error The ENV variable is invalid.)
endif

SERVICE_NAME=hectorgarcia-api
FULL_IMAGE_NAME=$(IMAGE):$(ENV)-`date +%s`
DOCKERFILE := -f docker/Dockerfile
DOCKER_NETWORK_NAME=local-network
DOCKER_NETWORK := $(shell docker network ls | grep $(DOCKER_NETWORK_NAME))

COMPOSE_FILE_PATH := -f docker/docker-compose.yml

dc-build:
	$(info Make: Building "$(ENV)" environment images.)
	docker-compose $(COMPOSE_FILE_PATH) build --no-cache
	@make -s clean

dc-start:
	$(info Make: Starting "$(ENV)" environment containers.)
ifeq ($(DOCKER_NETWORK), )
	$(info Make: Creating default local network "$(DOCKER_NETWORK_NAME)")
	@docker network create $(DOCKER_NETWORK_NAME)
endif
	@docker-compose $(COMPOSE_FILE_PATH) up -d

dc-stop:
	$(info Make: Stopping "$(ENV)" environment containers.)
	@docker-compose $(COMPOSE_FILE_PATH) stop

dc-restart:
	$(info Make: Restarting "$(ENV)" environment containers.)
	@make -s dc-stop
	@make -s dc-start

build:
	$(info Make: Building "$(ENV)" environment images.)
	@ echo $(FULL_IMAGE_NAME) > built-image.txt
	@docker build -t $(FULL_IMAGE_NAME) $(DOCKERFILE) .
	@docker tag $$(cat built-image.txt) $(IMAGE):$(ENV)

push:
	$(info Make: Pushing tagged image.)
	@docker push $$(cat built-image.txt)
	@docker push $(IMAGE):$(ENV)

pull:
	$(info Make: Pulling tagged image.)
	@docker pull $(FULL_IMAGE_NAME)

clean:
	@docker system prune --volumes --force
