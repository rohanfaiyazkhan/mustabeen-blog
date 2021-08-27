---
title: Deploying a Fast AI model to Azure Functions
author: Qazi Mustabeen Noor
draft: true
tags: ['machine learning', 'fast ai']
date: 2021-06-16
---

## Serverless Deployments

<!-- Excerpt Start -->

Azure Functions can be an excellent choice for deploying a FastAi model (or any machine learning model that performs classification or regression). Azure Functions is a severless event driven cloud platform hosted by Microsoft's Azure services, and is similar to AWS Lambda. Unlike a standard web server, serverless functions are only active when they are invoked, and are billed per computational time. Along with that, most Azure accounts will have a significant number of free requests (under the basic consumption plan upto 1 million requests are free) and this makes it ideal for prototyping proof of concepts.

<!-- Excert End -->
