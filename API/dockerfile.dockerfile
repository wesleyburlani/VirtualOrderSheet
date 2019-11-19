FROM microsoft/dotnet:2.2-sdk AS build-env
WORKDIR /app
 
WORKDIR /app
COPY . .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet API.dll