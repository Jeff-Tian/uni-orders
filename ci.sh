nvm use 12.16.2

yarn test

yarn start:dev-env
echo "dev env started..."
echo "starting e2e tests..."
yarn test:e2e
echo "e2e tests done"

sh .travis/ci.sh

echo "stopping dev env..."
yarn stop:dev-env
echo "dev env stopped."
