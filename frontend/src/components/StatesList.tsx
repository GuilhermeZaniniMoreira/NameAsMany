import React, { useEffect, useState } from 'react';
import { ICity, IStates } from '../interfaces';
import { List, Card, Typography } from 'antd';

function StatesList(props: { cities: ICity[] }) {

  const { Text } = Typography;

  const { cities } = props;

  const [states, setStates] = useState<IStates>({});

  useEffect(() => {
    for (const city of cities) {
      setStates({
        ...states,
        [city.state_abbreviation]: [...states[city.state_abbreviation] ?? [], city],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  return (
    <React.Fragment>
      <List
        style={{ marginLeft: '20%', marginRight: '20%' }}
        grid={{
          xs: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 3,
        }}
        dataSource={Object.values(states).sort((stateA, stateB) => stateA.length - stateB.length)}
        renderItem={item => (
          <List.Item>
            <Card
              title={item[0].state_name}
            >
              <List
                dataSource={item}
                renderItem={item =>
                  <List.Item>{item.name}</List.Item>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
};

export default StatesList;
