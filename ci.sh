nvm use 12.16.2

npm test

npm run start:dev-env
echo "dev env started..."
echo "starting e2e tests..."
npm run test:e2e
echo "e2e tests done"

docker build -t jefftian/uni-orders .
docker images
docker run --network host -e CI=true -d -p 127.0.0.1:3000:3000 --name uni-orders jefftian/uni-orders
docker ps | grep -q uni-orders
docker ps -aqf "name=uni-orders$"
docker push jefftian/uni-orders
docker logs $(docker ps -aqf name=uni-orders$)
curl localhost:3000 || docker logs $(docker ps -aqf name=uni-orders$)
docker kill uni-orders || echo "uni-orders killed"
docker rm uni-orders || echo "uni-orders removed"

echo "stopping dev env..."
npm run stop:dev-env
echo "dev env stopped."
