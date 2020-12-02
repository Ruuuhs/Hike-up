#!/bin/bash

rails s -d -b 0.0.0.0
rails db:create
rails db:migrate
