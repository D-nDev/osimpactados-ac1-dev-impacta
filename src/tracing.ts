import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import * as api from '@opentelemetry/api';
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks';
import { PrismaInstrumentation } from '@prisma/instrumentation';

export const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'establishmentmicroservices',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV ?? 'development',
  }),
});

const contextManager = new AsyncHooksContextManager().enable();

api.context.setGlobalContextManager(contextManager);

if (process.env.NODE_ENV === 'development') {
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
}

if (!process.env.ASPECTO_KEY) {
  console.log('Aspecto key not found, disabling cloud tracing...');
}

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new OTLPTraceExporter({
      url: 'https://otelcol.aspecto.io/v1/traces',
      headers: {
        Authorization: process.env.ASPECTO_KEY,
      },
    }),
  ),
);

provider.register();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation({
      enabled: true,
    }),
    new PrismaInstrumentation(),
  ],
});
