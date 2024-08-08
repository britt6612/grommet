import React, {
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { Splits } from 'grommet-icons/icons/Splits';
import { Lock } from 'grommet-icons/icons/Lock';
import { Box } from '../Box';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { DataForm, formColumnsKey } from '../Data';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormContext } from '../Form/FormContext';
import { DropButton } from '../DropButton';
import { List } from '../List';
import { Tab } from '../Tab';
import { Tabs } from '../Tabs';
import { TextInput } from '../TextInput';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { DataTableColumnsPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const dropProps = {
  align: { top: 'bottom', left: 'left' },
};

const tabsProps = {
  drop: { pad: 'small' },
  noDrop: { justify: 'start' },
};

// options can either be an array of property names or an array of objects.
// The form value always uses an array of property names.
const optionsToValue = (options) =>
  options?.map((o) => (typeof o === 'object' && o.property) || o) || [];

const optionProperty = (option) =>
  typeof option === 'object' ? option.property : option;

// align the order in value to the order in options, as best we can
const alignOrder = (value, prevValue, options) =>
  value.sort((p1, p2) => {
    // if both are in prevValue, preserve the order from that
    let i1 = prevValue.findIndex((n) => n === p1);
    let i2 = prevValue.findIndex((n) => n === p2);
    if (i1 !== -1 && i2 !== -1) return i1 - i2;
    i1 = options.findIndex((o) => optionProperty(o) === p1);
    i2 = options.findIndex((o) => optionProperty(o) === p2);
    return i1 - i2;
  });

// Content is a separate component since it might be getting its form context
// from the DataForm rendered inside DataTableColumns.
const Content = ({ drop, options = [], ...rest }) => {
  const { id: dataId, messages } = useContext(DataContext);
  const { useFormInput } = useContext(FormContext);
  const { format } = useContext(MessageContext);

  // If the user searches for a particular option, render
  // the filtered list of options.
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  // Note whether options are objects so we can set up the *key properties
  // as needed when rendering.
  const objectOptions = useMemo(
    () => options && options.length && typeof options[0] === 'object',
    [options],
  );

  const pinned = useMemo(() => {
    const items = objectOptions
      ? options
          .filter((option) => option.pinned && option.label)
          .map((option) => option.label)
      : [];
    return items?.length
      ? {
          background: 'none',
          color: 'text-weak',
          icon: <Lock />,
          items,
        }
      : undefined;
  }, [options, objectOptions]);

  const defaultVisible = useMemo(() => {
    if (!objectOptions) return [];
    return options
      .filter((option) => option.defaultVisable === false && option.label)
      .map((option) => option.label.toLowerCase());
  }, [options, objectOptions]);

  // Compute initialValue1 outside of useEffect
  const initialValue = useMemo(() => {
    const valueFromOptions = optionsToValue(options);
    return valueFromOptions.filter(
      (item) => !defaultVisible.includes(item.toLowerCase()),
    );
  }, [options, defaultVisible]);

  const [value, setValue] = useFormInput({
    name: formColumnsKey,
    initialValue,
  });

  // When the user searches, updated the filtered options based on the
  // search string.
  const onSearch = useCallback(
    (nextSearch) => {
      let nextFilteredOptions = options;
      if (nextSearch) {
        const lowerSearch = nextSearch.toLowerCase();
        nextFilteredOptions = options.filter((o) =>
          (o.label ?? o.property ?? o)?.toLowerCase().includes(lowerSearch),
        );
      }
      setSearch(nextSearch);
      setFilteredOptions(nextFilteredOptions);
    },
    [options],
  );

  return (
    <Box>
      <Tabs {...tabsProps[drop ? 'drop' : 'noDrop']} {...rest}>
        <Tab
          id={`${dataId}--select-columns-tab`}
          title={format({
            id: 'dataTableColumns.select',
            messages: messages?.dataTableColumns,
          })}
        >
          <Box pad={{ vertical: 'small' }} gap="xsmall">
            <TextInput
              type="search"
              icon={<Search />}
              placeholder="Search"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
            />
            <CheckBoxGroup
              id={`${dataId}--select-columns`}
              name={formColumnsKey}
              aria-labelledby={`${dataId}--select-columns-tab`}
              options={filteredOptions}
              valueKey={(objectOptions && 'property') || undefined}
              labelKey={(objectOptions && 'label') || undefined}
              value={value}
              onChange={({ value: nextValue }) =>
                setValue(alignOrder(nextValue, value, options))
              }
            />
          </Box>
        </Tab>

        <Tab
          id={`${dataId}--order-columns-tab`}
          title={format({
            id: 'dataTableColumns.order',
            messages: messages?.dataTableColumns,
          })}
        >
          <Box pad={{ top: 'small' }}>
            <List
              id={`${dataId}--order-columns`}
              aria-labelledby={`${dataId}--order-columns-tab`}
              // List wants objects if possible to be able to use 'label'
              data={value.map(
                (v) =>
                  (objectOptions && options.find((o) => o.property === v)) || v,
              )}
              onOrder={(nextData) => setValue(optionsToValue(nextData))}
              pad="none"
              primaryKey={(objectOptions && 'label') || undefined}
              pinned={pinned}
            />
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};

export const DataTableColumns = ({ drop, options, ...rest }) => {
  const { id: dataId, messages, view, onView } = useContext(DataContext);
  const { inDataForm } = useContext(DataFormContext);
  const { format } = useContext(MessageContext);
  const theme = useThemeValue();
  const [showContent, setShowContent] = useState();

  useEffect(() => {
    console.log('view', view);
  }, [view]);

  const objectOptions = useMemo(
    () => options && options.length && typeof options[0] === 'object',
    [options],
  );

  const defaultVisible = useMemo(() => {
    if (!objectOptions) return [];
    return options
      .filter((option) => option.defaultVisable === false && option.label)
      .map((option) => option.label.toLowerCase());
  }, [options, objectOptions]);

  // Compute initialValue1 outside of useEffect
  const initialValue = useMemo(() => {
    const valueFromOptions = optionsToValue(options);
    return valueFromOptions.filter(
      (item) => !defaultVisible.includes(item.toLowerCase()),
    );
  }, [options, defaultVisible]);

  // useEffect(() => {
  //   // if we are getting the step or page from outside the view,
  //   // update the Data's view in case it needs to filter.
  //   if (onView) onView({ ...view, page, step });
  // }, [onView, page, step, view]);

  useEffect(() => {
    console.log('new effect');
    const newView = {
      ...view,
      columnns: initialValue,
    };
    if (onView && view.columns !== initialValue) {
      onView(newView);
    }
    console.log(newView);
  }, [onView, view, initialValue]);

  const tip = format({
    id: 'dataTableColumns.tip',
    messages: messages?.dataTableColumns,
  });

  let content = <Content drop={drop} options={options} />;
  if (!inDataForm) {
    console.log('hello in !dataform');
    content = (
      <DataForm footer={false} updateOn="change">
        {content}
      </DataForm>
    );
  }

  if (!drop) return content;

  const control = (
    <DropButton
      id={`${dataId}--columns-control`}
      aria-label={format({
        id: 'dataTableColumns.open',
        messages: messages?.dataTableColumns,
      })}
      kind={theme.data.button?.kind}
      icon={<Splits />}
      tip={tip}
      dropProps={dropProps}
      dropContent={content}
      open={showContent}
      onOpen={() => setShowContent(undefined)}
      onClose={() => setShowContent(undefined)}
      {...rest}
    />
  );

  return control;
};

DataTableColumns.propTypes = DataTableColumnsPropTypes;
