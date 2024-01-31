import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {utilities} from '../store/Actions/utilitisAction';
import {filter} from 'loadsh';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {primaryColor} from '../style/variables';
import {Icon} from 'native-base';
const CountryCode = (props)=>{
  const [IsSearch, setIsSearch] = useState(false);
  const [ModalShow, setModalShow] = useState(true);
  const dispatch = useDispatch();
  function getNationcode() {
    dispatch(utilities());


             }
  const [fulldata, setFulldata] = useState();
  let nationcode;
  nationcode = useSelector(state => state.utilitiesReducer);

  const getfulldata = () => {
    if (nationcode.lodingData) {
      setFulldata(nationcode.data.countries);
    }
  };

  useEffect(() => {
    getNationcode();
    getfulldata();
  }, []);
  //  console.log("nation code",fulldata);
  const getCloseWithData = code => {

                    props.closeModal(code);
    setModalShow(false);
  };

  const renderdata = ({item}) => {
    return (
      <TouchableOpacity

                 onPress={()=>getCloseWithData(item.dialing_code)}
        style={{
          width: '100%',
          backgroundColor: '#ffff',
          alignItems: 'center',
          marginVertical: 5,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'space-between',
          }}>
          <View style={{width: '20%', marginLeft: 10}}>
            <Text style={{textAlign: 'left'}}>{item.dialing_code}</Text>
          </View>
          <View style={{width: '78%', marginRight: 10}}>
            <Text style={{textAlign: 'right'}}>({item.name})</Text>
          </View>

                    </View>
      </TouchableOpacity>
    );
  };
  const contains = (country, query) => {

        if (country.name.includes(query) || country.dialing_code.includes(query)){
      console.log('countries name contains', country);
      console.log('query name contains', query);
      return true;
    }
    return false;
  };
  const handlersearch = text => {
    if (nationcode.lodingData) {
      const formattedQuery = text;
      const data = filter(nationcode.data.countries, countries => {
        return contains(countries, formattedQuery);
      });
      setFulldata(data);
      if (text.length > 1) {
        setIsSearch(true);
      } else {
        setIsSearch(false);
      }

    // nationcode=data;
    }
  };
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          // marginLeft: '5%'
        }}
      />
    );
  };
  console.log('fulldata', fulldata);
  return (
    <Modal
      isVisible={ModalShow}
      style={{
        flex: 1,
        backgroundColor: '#ffff',
        marginVertical: -5,
        marginHorizontal: -10,



          backgroundColor: primaryColor,
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            backgroundColor: '#ffff',
            flexDirection: 'row',
            width: '100%',
            height: 40,
            borderRadius: 20,
          }}>
          <TextInput
            onChangeText={handlersearch}
            placeholder={'Search Country'}
            style={{width: '80%', height: 40, marginLeft: 10}}
          />
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              type="FontAwesome"
              style={{fontSize: 20, color: '#eee'}}
              name="search"
            />
          </View>
        </View>

            </View>
      <View style={{flex: 1, backgroundColor: '#ffff'}}>
        {nationcode.lodingData ? (
          <FlatList
            data={IsSearch ? fulldata : nationcode.data.countries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderdata}
            ItemSeparatorComponent={renderSeparator}
          />
        ) : (
          <SkeletonContent
            containerStyle={{flex: 1, width: '100%', marginVertical: '25%'}}
            //  isLoading={nationCode}
            layout={[
              {key: 'someId', width: '100%', height: 50, marginBottom: 6},
              {key: 'someOtherId', width: '100%', height: 50, marginBottom: 6},
              {key: 'someOtherId', width: '100%', height: 50, marginBottom: 6},
              {key: 'someOtherId', width: '100%', height: 50, marginBottom: 6},
              {key: 'someOtherId', width: '100%', height: 50, marginBottom: 6},
              {key: 'someOtherId', width: '100%', height: 50, marginBottom: 6},
              {key: 'someOtherId', width: '100%', height: 50, marginBottom: 6},
              {key: 'someOtherId', width: '100%', height: 50, marginBottom: 6},
              {key: 'someOtherId', width: '100%', height: 50, marginBottom: 6},

                   ]}
                  />

                 }



             </View>

          </Modal>
  );
};

export default CountryCode;
