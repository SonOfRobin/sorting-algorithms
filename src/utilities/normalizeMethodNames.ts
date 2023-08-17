import { SortMethod } from '../components/BarContainer';

const normalizeMethodNames = ({ name }: SortMethod) => {
  const indexOfFirstCapital = name.search(/[A-Z]/);
  if (indexOfFirstCapital >= 0) {
    const result = [];
    [...name.matchAll(/[A-Z][a-z]*/g)].forEach((match) => result.push(match[0]));
    result.unshift(cap(name.substring(0, indexOfFirstCapital)));
    return result.join(' ');
  }
  return cap(name);
};

function cap(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export default normalizeMethodNames;
