#!/bin/bash

export IMAGE_TAG="1.4.0"
export COMPOSE_PROJECT_NAME="firstnetwork"

GENERATE_CONFIG=$1
GENERATE_CONFIG_ONLY=$2

if [ ! -z "$GENERATE_CONFIG" ] && [ $GENERATE_CONFIG == "gen" ]
then
	export CHANNEL_NAME="firstchannel"

	cryptogen generate --config=./crypto-config.yaml

	mkdir channel-artifacts

	configtxgen -profile TwoOrgsOrdererGenesis -outputBlock ./channel-artifacts/genesis.block -channelID $CHANNEL_NAME

	configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME

	configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/TestPeerMSPanchors.tx -channelID $CHANNEL_NAME -asOrg TestPeerMSP	
fi

if [ -z "$GENERATE_CONFIG_ONLY" ]
then
	docker-compose -f docker-compose-cli.yaml up -d
fi

#peer channel create -o greenwood.deakin.edu.au:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/deakin.edu.au/orderers/greenwood.deakin.edu.au/msp/tlscacerts/tlsca.deakin.edu.au-cert.pem

