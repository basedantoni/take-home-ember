import Service from '@ember/service';

export default class DogCeoService extends Service {
  async getRandomDogImage(breed: string) {
    console.log('breed', breed);
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`,
    );
    if (!response.ok) {
      const defaultResponse = await fetch(
        'https://dog.ceo/api/breeds/image/random',
      );
      if (!defaultResponse.ok) {
        throw new Error('No dog image found');
      }

      const defaultData = await defaultResponse.json();
      return defaultData.message;
    }
    const data = await response.json();
    return data.message;
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:dog-ceo')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('dog-ceo') declare altName: DogCeoService;`.
declare module '@ember/service' {
  interface Registry {
    'dog-ceo-api': DogCeoService;
  }
}
