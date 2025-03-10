import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, {
      ...features,
      queueCommandTasks: true,
    });
  }

  async beforeQueue() {
    await this.dependsOnJHipster('jhipster-ai:spring-ai:bootstrap');
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      async postWritingTemplateTask({ source }) {
        source.addJavaDefinition({
          dependencies: [
            {
              groupId: 'org.springframework.ai',
              artifactId: 'spring-ai-ollama-spring-boot-starter',
            },
          ],
        });
      },
    });
  }
}
