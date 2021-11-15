import { gql, useQuery } from '@apollo/client';

const CURRENT_USER = gql`
  query {
    currentUser {
      id
      words
    }
  }
`;

const ALL_WORDS = gql`
  query {
    allWords {
      id
      word
      origin
      phonetic
      phonetics {
        audio
        text
      }
      meanings {
        partOfSpeech
        definitions {
          antonyms
          definition
          example
          synonyms
        }
      }
    }
  }
`;

const REGISTER = gql`
  mutation ($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`;

const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const ADD_WORD = gql`
  mutation ($word: String!) {
    addWord(word: $word)
  }
`;

export { ADD_WORD, ALL_WORDS, LOGIN, REGISTER, CURRENT_USER };
