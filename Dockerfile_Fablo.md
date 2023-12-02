
# Author       : Ramaguru Radhakrishnan, Assistant Professor, Amrita Vishwa Vidyapeetham
# Created Date : Nov-2023
# Updated Date : Nov-2023
# Description  : Dockerfile for building Docker Image with DisP-Track dependencies
# Image Tag    : 0.1.0


# Base Image is set to Ubuntu
FROM ubuntu

# Maintainer Label
LABEL maintainer="RAMAGURU RADHAKRISHNAN"

# Install the update and necessary dependencies 
RUN apt-get update && \
    apt-get -qy full-upgrade && \
	apt install sudo && \
    apt-get install -qy curl && \
    apt-get install -qy curl 

		
# Install Fablo Package		
RUN curl -Lf https://github.com/hyperledger-labs/fablo/releases/download/1.2.0/fablo.sh -o /usr/local/bin/fablo && chmod +x /usr/local/bin/fablo


# Set the working directory in the container
WORKDIR /home/disp-track

# Download config file from DisP-Track GitHub
RUN curl -Lf https://github.com/Amrita-TIFAC-Cyber-Blockchain/Disp-Track/blob/main/configs/Fablo_HF_Config_4Org_3Ord_4Peers_1Channel.json -o /home/disp-track/fablo-config.json 

# Download the chaincode file from DisP-Track GitHub
RUN mkdir chaincodes && \ 
	curl -Lf https://github.com/Amrita-TIFAC-Cyber-Blockchain/Disp-Track/blob/main/chaincodes/disp-track.js -o /home/disp-track/chaincodes/disp-track.js
	
# Install Docker inside Docker 	
RUN apt-get install docker.io -y
