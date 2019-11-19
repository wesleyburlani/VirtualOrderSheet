dotnet publish -c Release &&
docker build -t gpbaresapi ./bin/release/netcoreapp2.2/publish -f dockerfile.dockerfile &&
docker tag gpbaresapi registry.heroku.com/gpbares/web &&
docker push registry.heroku.com/gpbares/web && 
heroku container:release web -a gpbares