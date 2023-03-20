import React, {useEffect, useState} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RegistrationTypeData} from '../../../models/components/registration/registrationData';
import {Subtitle} from '../styles';

interface RegistrationInfoProps {
  type: RegistrationTypeData;
  step: number;
  setStep?: any;
}

export const RegistrationInfo: React.FC<RegistrationInfoProps> = ({
  type,
  step,
}) => {
  const [info, setInfo] = useState<{
    info: string;
    info2: string;
  }>({
    info: '',
    info2: '',
  });

  useEffect(() => {
    if (type && type) {
      const info1 = 'Quer cadastrar um conta CNPJ?';
      const info2 =
        'Não se preocupe, nessa etapa precisamos saber quem é pessoa física, nas próxima etapas conectaremos o CNPJ.';
      setInfo({info: info1, info2: info2});
    }
  }, [type, step]);
  console.log('INFOOOOO: ', info);
  return (
    <>
      {(type === 'instalation' || type === 'notInstalation') && step === 0 && (
        <>
          <Subtitle marginBottom={'30px'}>{info.info}</Subtitle>
          <Subtitle marginBottom={'30px'}>{info.info2}</Subtitle>
        </>
      )}
    </>
  );
};
