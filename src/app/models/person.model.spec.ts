import { Person } from './person.model';

describe('Test for Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Daniela', 'rique', 26, 65, 1.75);
  });

  it('should instant object', () => {
    expect(person.name).toEqual('Daniela');
    expect(person.lastName).toEqual('rique');
    expect(person.age).toEqual(26);
    expect(person.weigth).toEqual(65);
    expect(person.heigth).toEqual(1.75);
  });

  describe('test for calcImc', () => {
    it('should return a string:down', () => {
      person.weigth = 45;
      person.heigth = 1.85;
      const value = person.calcIMC();

      expect(value).toEqual('down');
    });

    it('should return a string:normal', () => {
      person.weigth = 65;
      person.heigth = 1.7;
      const value = person.calcIMC();

      expect(value).toEqual('normal');
    });

    it('should return a string:overweigth', () => {
        person.weigth = 75;
        person.heigth = 1.7;
        const value = person.calcIMC();
  
        expect(value).toEqual('overweigth');
      });
  });
});
