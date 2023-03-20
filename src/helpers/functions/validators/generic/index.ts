import {ErrorFieldType} from '../../../presentation/constants';

export const requiredField = (
  fieldInfo: string | boolean,
  required: boolean,
) => {
  if (required) {
    if (fieldInfo === '' || fieldInfo === false) {
      return ErrorFieldType.REQUIRED_FIELD;
    }
  } else {
    return null;
  }
};
