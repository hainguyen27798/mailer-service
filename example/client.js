import grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const PROTO_PATH = new URL('proto/mailer.proto', import.meta.url).pathname;

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition).mailer;

// Create client
const client = new proto.Mailer('localhost:50051', grpc.credentials.createInsecure());

// Call SayHello RPC
client.Send({ name: 'Hai' }, (error, response) => {
  if (error) {
    console.error('Error calling SayHello:', error);
    return;
  }
  console.log('Server response:', response.message);
});
