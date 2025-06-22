import grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

import { MailerService } from './services/mailer.service.js';

const PORT = process.env.PORT || 50051;

async function bootstrap() {
  const server = new grpc.Server();

  const PROTO_PATH = new URL('proto/mailer.proto', import.meta.url).pathname;

  const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const proto = grpc.loadPackageDefinition(packageDefinition).mailer;

  server.addService(proto?.['Mailer']?.service, { send: MailerService.send });

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Server error:', err);
      return;
    }
    console.log(`gRPC server running at ${port}`);
  });
}

bootstrap().then();
