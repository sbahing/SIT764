Resource to learn about crypto config, config generation and docker compose configuration:

https://www.youtube.com/playlist?list=PLjsqymUqgpSTGC4L6ULHCB_Mqmy43OcIh

this is youtube video resource with very good explaination but it will not go over 
generating docker containers and running those containers. Also additional research required
for fully understanding crypto-config.yaml, configtx.yaml and docker-compose-cli.yaml.

In official docs and also in this video resources, it is not mentioned that we cannot use
same channel_id to generate genesis block and channel config.

To deploy node chain code packaging is not required as mentioned in official docs.

we can just install node chaincode using peer chaincode command (refer to official docs for details).

*peer lifecycle chaincode* command will not work which is mentioned in docs "wierd".
