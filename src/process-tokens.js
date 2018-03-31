import { getCharDetails } from './provide-char-details';

/* eslint-disable complexity */

export const processTokens = (Tokens, fromSchemeTree, toScheme) => {

  const tokens = Tokens.slice();

  const virama = getCharDetails(';;', fromSchemeTree);

  for (let index = 0; index < tokens.length; index += 1) {

    const token = tokens[index];

    const nextToken = (index < tokens.length - 1) ? tokens[index + 1] : { type: 'strEnd' };

    if (toScheme.about.type === 'brahmic') {

      if (
        token.type === 'consonants' &&
        nextToken.type !== 'vowelMarks'
      ) {

        if (index < tokens.length) {

          tokens.splice(index + 1, 0, virama);

        }

      }

    }

    // console.log(token);

  }

  return tokens;

};
