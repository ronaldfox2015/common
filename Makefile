.DEFAULT_GOAL := help
.PHONY: venv
.EXPORT_ALL_VARIABLES:

## APP VARS ##
OWNER               = neoauto
SERVICE_TYPE        = common
APP_NAME            = $(OWNER)-$(SERVICE_TYPE)

## INCLUDE TARGETS ##
include makefiles/container.mk
include makefiles/help.mk