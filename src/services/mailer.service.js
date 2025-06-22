export class MailerService {
  static send = (call, callback) => {
    const { name } = call.request;
    callback(null, { message: `Hello, ${name}!` });
  };
}
