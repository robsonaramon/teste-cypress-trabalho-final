import { faker } from '@faker-js/faker'


export function getRandomEmail() {
    const timestamp = Date.now()
    return `qatest-${timestamp}@${faker.internet.domainName()}`
}
