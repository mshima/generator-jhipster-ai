import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, {
      ...features,
      queueCommandTasks: true,
    });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('jhipster:java:build-tool');
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      async postWritingTemplateTask({ source }) {
        source.addLogbackMainLog?.({ name: 'jdk.internal.httpclient.debug', level: 'INFO' });

        source.addJavaDefinition({
          dependencies: [
            {
              groupId: 'org.springframework.ai',
              artifactId: 'spring-ai-spring-boot-docker-compose',
            },
            {
              scope: 'import',
              groupId: 'org.springframework.ai',
              artifactId: 'spring-ai-bom',
              type: 'pom',
              version: '1.0.0-M6',
            },
          ],
        });
      },
    });
  }
}
