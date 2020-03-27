import cv2
import numpy as np
import glob
import os

# If tensorflow 2.0 is installed
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

#If tensorflow 1.0 is installed
#import tensorflow as tf

labels = ["Normal", "Bacterial", "Non-COVID19 Viral", "COVID-19 Viral"]

with tf.Session() as sess:
    saver = tf.train.import_meta_graph('./model.meta')
    saver.restore(sess, "./model")
    graph = tf.get_default_graph()

    # Get tensor names
    x = graph.get_tensor_by_name("input_1:0")
    op_to_restore = graph.get_tensor_by_name("dense_3/Softmax:0")

    # Preprocess imgae imput
    for img_path in glob.glob("./test_files/*"):
        print(os.path.basename(img_path))
        src = cv2.imread(img_path)
        src = src.astype('float32') / 255.0
        src= cv2.resize(src, (224, 224))
        src = src.reshape(1, 224, 224, 3)
        feed_dict ={x: src}

        result_index = sess.run(op_to_restore,feed_dict)
        print (labels[np.argmax(result_index)])
