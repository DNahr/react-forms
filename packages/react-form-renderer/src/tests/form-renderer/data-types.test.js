import React from 'react';
import { mount } from 'enzyme';
import FormRenderer from '../../files/form-renderer';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../files/component-types';
import useFieldApi from '../../files/use-field-api';
import convertType from '../../common/convert-type';
import dataTypes from '../../files/data-types';

const DataTypeInput = (props) => {
  const { input, type, label } = useFieldApi(props);
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <input type={type} id={input.name} {...input} />
    </div>
  );
};

describe('data types', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      FormTemplate: (props) => <FormTemplate {...props} />,
      componentMapper: {
        [componentTypes.TEXT_FIELD]: DataTypeInput
      },
      schema: {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'data-type-text',
            label: 'Data type test',
            type: 'text',
            dataType: 'integer'
          }
        ]
      }
    };
  });

  it('should add integer data type validator and save interger to form state', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<FormRenderer {...initialProps} onSubmit={onSubmit} />);
    expect(wrapper.find(DataTypeInput)).toHaveLength(1);
    const input = wrapper.find('input');
    /**
     * should not allow submit
     * validator should prevent submit if anything else than number is passed to the input
     */
    input.simulate('change', { target: { value: 'sadsad' } });
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();

    input.simulate('change', { target: { value: '123' } });
    wrapper.update();

    wrapper
      .find('form')
      .first()
      .simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-type-text': 123
      }),
      expect.anything(),
      expect.anything()
    );
  });

  describe('converTypes', () => {
    describe('integer', () => {
      it('converts empty string', () => {
        expect(convertType(dataTypes.INTEGER, '')).toEqual('');
      });

      it('converts zero', () => {
        expect(convertType(dataTypes.INTEGER, '0')).toEqual(0);
      });

      it('converts an integer', () => {
        expect(convertType(dataTypes.INTEGER, '12132')).toEqual(12132);
      });

      it('converts a string', () => {
        expect(convertType(dataTypes.INTEGER, 'abcd')).toEqual('abcd');
      });

      it('converts a negative integer', () => {
        expect(convertType(dataTypes.INTEGER, '-12132')).toEqual(-12132);
      });
    });
  });
});
