import fetchData from 'utils/fetchData';

const factResource = fetchData<{
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
}>('https://uselessfacts.jsph.pl/random.json');

export default function RandomFact() {
  const randomFact = factResource.read();

  return <p>{randomFact.text}</p>;
}
