import MyStyles from "../../styles/MyStyles";
import { View, ActivityIndicator, StyleSheet } from "react-native"
import React from 'react';

import { Card, Divider, Text } from "react-native-paper"
import APIs, { endpoints } from "../../configs/APIs";
const HanghoaDetails = ({route}) => {
    
    const [hanghoa, setHanghoa] = React.useState(null);

    //kiểm tra xem route.params có phải là null hoặc undefined trước khi cố gắng truy cập thuộc tính hanghoaId
    const hanghoaId = route.params?.hanghoaId;
 
 
    const loadHanghoa = async () => {
        try {
            let res = await APIs.get(endpoints['hanghoa-details'](hanghoaId));
            setHanghoa(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }
 
    React.useEffect(() => {
        loadHanghoa();
    }, [hanghoaId]);




  return (
    <View style={[MyStyles.container, styles.container]}>
      {hanghoa === null ? (
        <ActivityIndicator size="large" color="#1A4D2E" />
      ) : (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: hanghoa.image }} style={styles.coverImage} />
          <Card.Title 
            title={hanghoa.name} 
            subtitle={`Tủ đồ: ${hanghoa.tuDo}`} 
            titleStyle={styles.cardTitle} 
            subtitleStyle={styles.cardSubtitle} 
          />
          <Divider style={styles.divider} />
          <Card.Content>
          <Text style={[
                styles.statusText,
                hanghoa.status === 'recieved' && MyStyles.pass,
                hanghoa.status === 'waiting' && MyStyles.pending
              ]}>
                Trạng thái: {hanghoa.status}
              </Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5EFE6', // Light background color for the container
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#E8DFCA', // Light beige color for the card background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  coverImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 200,
  },
  cardTitle: {
    color: '#1A4D2E', // Dark green color for the card title
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#4F6F52', // Olive green color for the card subtitle
  },
  divider: {
    marginVertical: 10,
    backgroundColor: '#1A4D2E',
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    color: '#1A4D2E', // Default text color
  },
  pendingStatus: {
    backgroundColor: '#F5EFE6', // Light background color for pending status
  },
  waitingStatus: {
    backgroundColor: '#E7D37F', // Yellowish background color for waiting status
  },
  defaultStatus: {
    backgroundColor: '#E8DFCA', // Default status background color
  },
});

export default HanghoaDetails;