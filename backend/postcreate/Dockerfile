#create the base image 
FROM node:alpine 
# copy the package.json file 
COPY ./package.json ./ 
# install the packages 
RUN npm install
# copy your files 
COPY ./ ./ 
# execute commands 
CMD ["npm","start"]


