import { ComponentType, FunctionComponent, ReactNode } from 'react';
import { FormProps } from 'react-final-form';
import Schema from '../common-types/schema';
import ComponentMapper from '../common-types/component-mapper';
import { ValidatorMapper} from '../validator-mapper';
import { ActionMapper } from './action-mapper';
import SchemaValidatorMapper from '../common-types/schema-validator-mapper';
import { FormTemplateRenderProps } from '../common-types/form-template-render-props';
import { AnyObject } from '../common-types/any-object';

export interface FormRendererProps extends Omit<FormProps, 'onSubmit'> {
  initialValues?: object;
  onCancel?: (values: AnyObject, ...args: any[]) => void;
  onReset?: () => void;
  onError?: (...args: any[]) => void;
  onSubmit?: FormProps['onSubmit']
  schema: Schema;
  clearOnUnmount?: boolean;
  clearedValue?: any;
  componentMapper: ComponentMapper;
  FormTemplate?: ComponentType<FormTemplateRenderProps> | FunctionComponent<FormTemplateRenderProps>;
  validatorMapper?: ValidatorMapper;
  actionMapper?: ActionMapper;
  schemaValidatorMapper?: SchemaValidatorMapper;
  FormTemplateProps?: AnyObject;
  children?: ReactNode | ((props: FormTemplateRenderProps) => ReactNode)
}

declare const FormRenderer: React.ComponentType<FormRendererProps>;

export default FormRenderer;
