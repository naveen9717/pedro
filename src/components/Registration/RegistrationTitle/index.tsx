import React, {useEffect, useState} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RegistrationTypeData} from '../../../models/components/registration/registrationData';
import {Subtitle, Title} from '../styles';

interface RegistrationTitleProps {
  type: RegistrationTypeData;
  step: number;
  setStep: any;
}

export const RegistrationTitle: React.FC<RegistrationTitleProps> = ({
  type,
  step,
  setStep,
}) => {
  const [text, setTitle] = useState<{
    title: string;
    marginTitle: string | null;
    subtitle: string;
    marginSubtitle: string | null;
  }>({
    title: '',
    marginTitle: null,
    subtitle: '',
    marginSubtitle: null,
  });

  useEffect(() => {
    if (type && type) {
      const instTitle = 'Vamos finalizar seu cadastro';
      const migrTitle = 'Vamos validar seu cadastro';
      const subtitleInst =
        'Precisamos verificar seus dados, insira os dados iguais ao seu cadastro da CPFL';
      const subtitleNotInst =
        'Precisamos verificar seus dados, insira os seus dados';
      if (type === 'instalation' || type === 'notInstalation') {
        setTitle({
          title: instTitle,
          marginTitle: step === 0 ? '30px' : '21px',
          subtitle:
            step === 0
              ? ''
              : type === 'instalation'
              ? subtitleInst
              : subtitleNotInst,
          marginSubtitle: '20px',
        });
      } else {
        // setStep(1);
        setTitle({
          title: migrTitle,
          marginTitle: '21px',
          subtitle: subtitleInst,
          marginSubtitle: '20px',
        });
      }
    }
  }, [type, step]);
  console.log('STEP: ', step);
  return (
    <>
      <Title marginBottom={text.marginTitle}>{text.title}</Title>
      {(step === 1 || type === 'migrated') && (
        <Subtitle marginBottom={text.marginSubtitle}>{text.subtitle}</Subtitle>
      )}
    </>
  );
};
